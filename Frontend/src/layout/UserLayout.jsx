import React from "react"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <div className="fade-slide-in">
                <main className="pt-15">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    )
}

export default UserLayout