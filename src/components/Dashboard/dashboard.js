import React, { Component } from 'react'
import FormField from '../Widgets/FormFields/formFields'
import styles from './dashboard.css';
import { firebaseTeams } from '../../firebase'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export default class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter Title'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    componentDidMount() {
        this.loadTeams();
    }

    loadTeams = () => {
        firebaseTeams.once('value')
            .then((snapshot) => {
                let teams = [];
                snapshot.forEach((childSnapshot) => {
                    teams.push({
                        id: childSnapshot.val().teamId,
                        name: childSnapshot.val().city
                    })
                })

                const newFormdata = { ...this.state.formData }
                const newElement = { ...newFormdata['teams'] }
                newElement.config.options = teams;
                newFormdata['teams'] = newElement;
                this.setState({
                    formdata:newFormdata
                })

            })
    }

    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formData
        };
        const newElement = {
            ...newFormdata[element.id]
        };

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }


        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        this.setState({
            formData: newFormdata
        });
    }

    validate = (element) => {
        let error = [true, '']

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required!' : ''}`;
            error = !valid ? [valid, message] : error;
        }
        return error;
    }

    submitButton = () => (
        this.state.loading ? 'Loading...' :
            <div>
                <button type="submit" >Add Post</button>

            </div>
    )

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
        }
        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }
        if (formIsValid) {


        } else {
            this.setState({
                postError: 'Something Wrong!'
            })
        }
    }
    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>{this.state.registerError}</div>
            : ''
    )

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);

        let html = stateToHTML(contentState);

        this.updateForm({ id: 'body', html });
        this.setState({
            editorState
        })
    }

    render() {
        return (
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <FormField
                        id={'author'}
                        formdata={this.state.formData.author}
                        change={(element) => this.updateForm(element)}
                    ></FormField>
                    <FormField
                        id={'title'}
                        formdata={this.state.formData.title}
                        change={(element) => this.updateForm(element)}
                    ></FormField>

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    >

                    </Editor>

                    <FormField
                        id={'teams'}
                        formdata={this.state.formData.teams}
                        change={(element) => this.updateForm(element)}
                    ></FormField>
                    {this.submitButton()}
                    {this.showError()}
                </form>

            </div>
        )
    }
}
