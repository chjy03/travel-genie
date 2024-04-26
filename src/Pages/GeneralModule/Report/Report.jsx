import React, { useState } from 'react';
import './report.css';
import reportImage from '../../../Assets/image2.jpg'; 

const Report = () => {
    const [issueText, setIssueText] = useState(''); // State to hold the textarea value

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here

        // Display alert box with a message
        alert('Submitted!');

        // Clear the textarea by resetting the state
        setIssueText('');
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
