import { Container, Row } from "react-bootstrap";

const ReadMe = () => {
    return (
        <Container fluid={true} style={{ marginTop: '5rem', marginBottom: '3rem', maxWidth: '95%' }}>
            <Row>
                <h4>General remarks:</h4>
            </Row>
            <Row>
                <p>Account type is assigned based on email domain. To test without experiencing any intended restrictions,
                    sign up with a UZH (or another univeristy's) email. A non-student account will not be permitted to apply to
                    listings or use the GatherTogether collaborative feature.
                </p>
            </Row>
            <Row>
                <p>You can navigate using the Navbar - pressing the CozyCave logo will take you to the results page, pressing on the
                    profile icon (when logged in) will take you to the profile page. Using the GatherTogether button will take you to
                    the real-time collaborative feature.</p>
            </Row>
            <Row>
                <h4>High-level components:</h4>
            </Row>
            <Row>
                <h5>Results Page</h5>
            </Row>
            <Row>
                <p>Essentially the most important page of the client - this displays either all the listings currently published
                    on the server, or, if a search criteria is used through the Navbar,
                    listings that match the selected parameters. Clicking on any single listing takes the user to the
                    listing overview page.</p>
            </Row>
            <Row>
                <h5>Listing Overview Page</h5>
            </Row>
            <Row>
                <p>This page provides detailed information about a specific listing - picture, location,
                    rent and deposit, special requirements (applicant gender), as well as map view of
                    the listing's location and a calculated time to the user's addresses.</p>
            </Row>
            <Row>
                <p>There is also the option to send an application to the listing's owner (in which case they will be
                    notified and be able to view your application through the Profile page)</p>
            </Row>
            <Row>
                <h5>Profile Page</h5>
            </Row>
            <Row>
                <p>The profile page of a user provides not only a way to see/edit your information, but also access to the tabs
                    MyApplications and MyListings - MyApplications displays all of the listings you applied to, together with the
                    status of your application (pending, accepted or denied).</p>
            </Row>
            <Row>
                <p>MyListings displays a list of all the listings you created, each with a list of people that applied to them,
                    along with the options to accept an individual applicant (in which case the other applicants are
                    automatically denied) or deny the applicant (in which case other applications remain open).</p>
            </Row>
            <Row>
                <h5>Navbar</h5>
            </Row>
            <Row>
                <p>The Navbar component at the top is visible on any page, and provides search and navigation functionality
                    - in terms of searching, users can either type in keywords in the search bar, or use the sortings and
                    filters available to modify the listings displayed.</p>
            </Row>
            <Row>
                <p>In terms of navigation functionality, the Navbar allows the user to go to the Results page by clicking on
                    the CozyCave logo on the far left, go to the GatherTogether page by clicking on the GatherTogether button,
                    or view the profile functionality by clicking on the profile icon on the far right.</p>
            </Row>
            <Row>
                <h5>GatherTogether Page</h5>
            </Row>
            <Row>
                <p>This page implements the real-time collaborative feature of the project using websockets- a way for students
                    to connect with other students and exchange contact details.</p>
            </Row>
            <Row>
                <p>It interacts with the profile page and displays a limited view of the user data (name, biography, but no
                    contact details) on the real-time list. Other users have the option of clicking "Request details" to send
                    a request to the user, which will show up as a prompt that can be accepted or denied. In either case, the
                    user who sent the request will be notified, either with a form displaying the user details, or a small
                    notification that the request was denied.</p>
            </Row>
            <Row>
                <p>Disconnecting from the service will remove the user from everyone else's list.</p>
            </Row>
        </Container>)
}

export default ReadMe;