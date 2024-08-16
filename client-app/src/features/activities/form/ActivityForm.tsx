import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, FormInput, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial, loading } = activityStore
    const { id } = useParams();// to get id from route params
    const [activity, setActivity] = useState<Activity>({ //we have initial state of activity
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    })
    const navigate = useNavigate();

    useEffect(() =>{
        if(id) loadActivity(id).then(activity => setActivity(activity!));//if we have id from route params, !=undefined
    }, [id, loadActivity])

    function handleSubmit() {
        if(!activity.id){
            activity.id == uuid();
            createActivity(activity).then(()=>{
                navigate(`/activities/${activity.id}`);
            });
        } else{
            updateActivity(activity).then(()=>{
                navigate(`/activities/${activity.id}`)
            });;
        } 
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if(loadingInitial) return <LoadingComponent content = "Loading activity..."/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <FormInput placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <FormInput placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <FormInput type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <FormInput placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <FormInput placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button  loading ={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})