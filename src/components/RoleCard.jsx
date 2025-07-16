import React from 'react'

export const RoleCard = (props) => {
    return (
        <div class="card" style={{"text-align": "center","cursor": "pointer"}} onclick="showStudentView()">
            <h3 style={{"color": "#2e7d32", "margin-bottom": "15px"}}>{props.role}</h3>
            <p>{props.message}</p>
        </div>
    )
}
