import React from "react";
import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavAdmin from './ComponentAdmin/NavbarAdmin/NavAdmin'
import StudentFeed from "./ComponentStudent/ScreenStudent/StudentFeed";
import StudentProfile from "./ComponentStudent/ScreenStudent/StudentProfile";
import AdminFeed from "./ComponentAdmin/ScreenAdmin/AdminFeed";
import CRUDuser from "./ComponentAdmin/ScreenAdmin/CRUDuser";
import AddFunc from "./ComponentAdmin/AdminCRUDComp/UserCRUD/AddUserFunc";
import EditFunc from "./ComponentAdmin/AdminCRUDComp/UserCRUD/EditUserFunc";
import AddProblemFunc from "./ComponentAdmin/AdminCRUDComp/ProblemCRUD/AddProblemFunc";
import EditProblemFunc from "./ComponentAdmin/AdminCRUDComp/ProblemCRUD/EditProblemFunc";
import CRUDproblem from "./ComponentAdmin/ScreenAdmin/CRUDproblem";
import MainAddData from "./ComponentAdmin/ScreenAdmin/MainAddData";
import AdvisorFeed from "./ComponentAdvisor/ScreenAdvisor/AdvisorFeed"
import AdvisorSeeStudentProfile from "./ComponentAdvisor/ScreenAdvisor/AdvisorSeeStudentProfile";
import MainCategories from "./ComponentAdmin/ScreenAdmin/MainCategories";
import CategoryDetail from "./ComponentAdmin/AdminCRUDComp/CategoryCRUD/CategoryDetail";

// import AddCategory from "./ComponentAdmin/AdminCRUDComp/ProblemCRUD/AddCategory";
// import EditCategory from "./ComponentAdmin/AdminCRUDComp/ProblemCRUD/EditCategory";
// import MainCategory from "./ComponentAdmin/ScreenAdmin/MainCategory";
// import AddCategory2 from "./react-redux-component-test/AddCategory2";
// import EditCategory2 from "./react-redux-component-test/EditCategory2";
// import CategoryList2 from "./react-redux-component-test/CategoryList2";


//Hospital pages
import HospitalPage from './ComponentAdmin/ScreenAdmin/HospitalPage';
import HospitalDetailPage from './ComponentAdmin/ScreenAdmin/HospitalDetailPage';
import HospitalEdit from './ComponentAdmin/AdminCRUDComp/Hospital/HospitalEdit'

import MainProblemAndCategory from "./ComponentAdmin/ScreenAdmin/MainProblemAndCategory";

//Auth pages
import ResetPassword from "./Login/ResetPassword";
import Login from "./Login/Login";
import StudentPostEdit from "./ComponentStudent/StudentFeedComp.js/StudentPostComp/StudentPostEdit";
import AddTask from "./ComponentAdmin/AdminCRUDComp/UserCRUD/AchievementComponent/AddTask";


function App() {
  return (
    <>
    <NavAdmin />
  
    <div className="container">
      <BrowserRouter>
        <Switch>
        
          <Route path="/Login" component={Login} exact></Route>
          <Route path="/StudentProfile" component={StudentProfile} exact></Route>
          <Route path="/StudentFeed" component={StudentFeed} exact></Route>
          <Route path="/StudentPostEdit/:id" component={StudentPostEdit} exact></Route>
          <Route path="/AdvisorFeed" component={AdvisorFeed} exact></Route>
          <Route path="/AdminFeed" component={AdminFeed} exact></Route>
          <Route path="/AdvisorSeeStudentProfile" component={AdvisorSeeStudentProfile} exact></Route>          
          <Route path="/MainProblemAndCategory" component={MainProblemAndCategory} exact></Route>
          <Route path="/MainAddData" component={MainAddData} exact></Route>
          <Route path="/CRUDproblem" component={CRUDproblem} exact></Route>
          <Route path="/CRUDuser" component={CRUDuser} exact></Route>
          <Route path="/AddFunc" component={AddFunc} exact></Route>
          <Route path="/AddProblemFunc" component={AddProblemFunc} exact></Route>
          <Route path="/EditFunc/:id" component={EditFunc} exact></Route>
          <Route path="/EditProblemFunc" component={EditProblemFunc} exact></Route>
          <Route path="/AddTask/:id" component={AddTask} exact></Route>
          {/*์New category Section(Func Comp) */}
          <Route path="/MainCategory/Category" exact><MainCategories/></Route>
          <Route path="/MainCategory/Category/:id" exact><CategoryDetail/></Route>
          {/*์ end of New category Section(Func Comp) */}

          {/* Hospital section */}
          <Route path="/MainCategory/Hospital" exact><HospitalPage/></Route>
          <Route path="/MainCategory/Hospital/:id" exact><HospitalDetailPage /></Route>
          <Route path="/MainCategory/HospitalEdit/:id" exact><HospitalEdit/></Route>
          
          {/* end of hospital section */}
          <Route path="/" exact={true} component={AdminFeed}></Route>
          <Route path="/ResetPassword" exact= {true} component={ResetPassword}></Route>
          <Redirect to="/" />

             {/* The Oldest category Section(Class Comp) 
            <Route path="/MainCategory" component={MainCategory} exact></Route>
            <Route path="/AddCategory" component={AddCategory} exact></Route>
            <Route path="/EditCategory" component={EditCategory} exact></Route>
          */}

      
        </Switch>
      </BrowserRouter>
    </div>
   
    </>
  );
}

export default App;
