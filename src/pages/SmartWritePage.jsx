import React from "react";
import SmartWriterFlow from "../components/SmartWriter";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";

const SmartWriterPage = () => {
    return (
        <div>
            <Header />

            <SmartWriterFlow />
            <Footer/>
        </div>
    );
};

export default SmartWriterPage;
