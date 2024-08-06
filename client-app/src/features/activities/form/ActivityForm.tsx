import React, { ChangeEvent, useState } from "react";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean
}

export default function ActivityForm({ activity: selectedActivity, closeForm,createOrEdit, submitting }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState)

    function handleSubmit(){
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name, value} =event.target;
        setActivity({...activity, [name]: value})
    }


    return (
        <Segment clearing>
            <Form onSubmit={()=>handleSubmit()} autoComplete='off'>
                <FormInput placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <FormInput placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <FormInput type="date" placeholder='Date' value={activity.date} name='date'  onChange={handleInputChange}/>
                <FormInput placeholder='City' value={activity.city} name='city'  onChange={handleInputChange}/>
                <FormInput placeholder='Venue' value={activity.venue} name='venue'  onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'  onChange={handleInputChange}/>
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel'  onChange={handleInputChange}/>
            </Form>
        </Segment>
    )
}