import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";
import "./style.css";


const Mobile = () => {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        console.log(number);
        setError("");
        if (number === "" || number === undefined)
            return setError("⚠️Please enter a valid phone number⚠️!");
        try {
            const response = await setUpRecaptha(number);
            console.log(response);
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        console.log(otp);
        if (otp === "" || otp === null) return;
        try {
            await result.confirm(otp);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="p-4 box">
                <h2 className="mb-3ff">Firebase Phone Auth</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <PhoneInput
                            defaultCountry="IN"
                            value={number}
                            onChange={setNumber}
                            placeholder="Enter Phone Number"
                        />
                        <div id="recaptcha-container"></div>
                    </Form.Group>
                    <div className="button-right">
                        <Link to="/Login">
                            <Button variant="secondary">Cancel</Button>
                        </Link>
                        &nbsp;
                        <Button type="submit" variant="primary">
                            Send Otp
                        </Button>
                    </div>
                </Form>

                <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Control
                            type="otp"
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </Form.Group>
                    <div className="button-right">
                        <Link to="/Login">
                            <Button variant="secondary">Cancel</Button>
                        </Link>
                        &nbsp;
                        <Button type="submit" variant="primary">
                            Verify
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Mobile;