import { Modal, Button, Form, Row, Col, Dropdown, FormLabel, InputGroup } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import React, {useState} from 'react';
import {api, handleError} from './helpers/api'
import Address from './components/schemas/Address';
import Gender from './components/schemas/Gender';
import axios from 'axios';

function AdOverviewPage(props) {
    const navigate = useNavigate();
    const {id} = useParams();
    return (
        <div>
            <p>AdOverview {id}</p>
        </div>
    )

}

export default AdOverviewPage;