import React, { useState } from 'react';
import './report.css';
import reportImage from '../../../Assets/image2.jpg'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const Report = () => {
    const [issueText, setIssueText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/report', { issueText });
            if (response.status === 201) {
                Swal.fire({
                    title: 'Submission Successful!',
                    html: 'Issue reported! We’ll address it promptly.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-swal-button'
                    }
                });
                setIssueText('');
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error submitting report. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-swal-button'
                }
            });
        }
    };

    return (
        <section className='report'>
            <div className="reportContainer">
                <div className="reportContent">
                    <div className="reportText">
                        <h1>Report a Problem</h1>
                        <p>If you have encountered any issues/problems, please use the form below to report them to us:</p>   
                        <form className="reportForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="issue">Describe the issue:</label>
                                <textarea
                                    id="issue"
                                    name="issue"
                                    rows="4"
                                    value={issueText}
                                    onChange={(e) => setIssueText(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="reportImage">
                        <img src={reportImage} alt="Report" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Report;
