import React from 'react';
import SellerPlatform from './SellerPlatform';
import { useUser } from './UserContext'; // Import the useUser hook

function LoggedInPage() {
    const { currentUser } = useUser(); // Use the context to get the current user

    return (
        <div>
            <h1>Welcome to the Admin Area</h1>
            <h2>{currentUser}</h2> {/* Display the current user's name */}
            <SellerPlatform/>
        </div>
    );
}

export default LoggedInPage;
