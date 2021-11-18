import React from 'react'
import { Button, Link } from '@mui/material';
import './style.scss';

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <img src="https://ielts-testpro.com/wp-content/uploads/2021/09/Group-8611-1.jpg" alt="" />
            <div>

                <Button className="back-home" variant="contained"><Link href="https://ielts-testpro.com">GO BACK HOME</Link></Button>
            </div>
        </div>
    )
}

export default PageNotFound
