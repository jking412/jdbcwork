import React from "react";
import './item.css'

class Item extends React.Component{

    render(){
        return(
            <div className="item"> 
                <div className="item-name" onClick={() => {this.props.showActiveUser(this.props.item.id)}}>{this.props.item.name}</div>
                <div className="delete-btn" onClick={() => {this.props.deleteUserById(this.props.item.id)}}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </div>
            </div>
        );
    }

}

export default Item;
