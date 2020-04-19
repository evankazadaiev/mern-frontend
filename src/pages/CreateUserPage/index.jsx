import React from "react";


import CreateEditUserForm from "../../components/CreateEditUserForm";

import './styles.scss';


const CreateUserPage = ({ mode }) => {
  return (
    <div className="page-wrapper">
      <CreateEditUserForm mode={mode}/>
    </div>
  )
};

export default CreateUserPage;
