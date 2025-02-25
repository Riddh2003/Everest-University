import { RouterProvider, createBrowserRouter } from 'react-router-dom' // Importing necessary modules from 'react-router-dom'
import ForOutlet from '../components/adminPage/ForOutlet' // Importing the outlet component for rendering child routes
import Professors from '../components/adminPage/Professors' // Importing the Professors component for routing
import Student from '../components/adminPage/Student' // Importing the Student component for routing
import Courses from '../components/adminPage/Courses' // Importing the Courses component for routing
import Circulation from '../components/adminPage/Circulation' // Importing the Circulation component for routing
import NewQuery from '../components/adminPage/NewQuery' // Importing the NewQuery component for the default route

function AdminPage() {
    // // Creating the router object using createBrowserRouter with defined routes
    // const router = createBrowserRouter([{
    //     path: "/", // The root path of the admin page
    //     element: <ForOutlet />, // The main component to render (used as a layout with child routes)
    //     children: [
    //         {
    //             path: "", // The default route under / (empty string)
    //             element: <NewQuery />, // Component to render when navigating to the default route
    //         },
    //         {
    //             path: "\Professors", // Path for professors page (with backslash)
    //             element: <Professors />, // Component to render when navigating to /Professors
    //         },
    //         {
    //             path: "\Student", // Path for student page (with backslash)
    //             element: <Student />, // Component to render when navigating to /Student
    //         },
    //         {
    //             path: "\Courses", // Path for courses page (with backslash)
    //             element: <Courses />, // Component to render when navigating to /Courses
    //         },
    //         {
    //             path: "\Circulation", // Path for circulation page (with backslash)
    //             element: <Circulation />, // Component to render when navigating to /Circulation
    //         },
    //     ]
    // }])

    return (
        // <>
        //     {/* Using the RouterProvider to wrap the router setup and make it available throughout the app */}
        //     <RouterProvider router={router} />
        // </>
        <ForOutlet />
    )
}

export default AdminPage // Export the Admin component to use in other parts of the app
