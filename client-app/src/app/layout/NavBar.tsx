import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
 
export default function NavBar() {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item heaer >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={()=>activityStore.openForm()}positive content="Create Activities" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}