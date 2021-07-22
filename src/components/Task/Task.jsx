import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

const Task = (props) => {
	const { title, content, done, checkboxChange, onEditClick, onDeleteClick } =
		props;

	return (
		<>
			<div className={done ? "task done" : "task"}>
				<div className="buttons_container">
					<Checkbox
						color="primary"
						checked={done}
						onChange={(e) => checkboxChange(e)}
					/>
					<IconButton
						aria-label="edit"
						color="inherit"
						onClick={onEditClick}
						disabled={done}
					>
						<EditIcon style={{ fontSize: 30 }} />
					</IconButton>
					<IconButton
						aria-label="delete"
						color="secondary"
						onClick={onDeleteClick}
					>
						<DeleteIcon style={{ fontSize: 30, color: "#ad3234" }} />
					</IconButton>
				</div>
				<h1>{title}</h1>
				<p>{content}</p>
			</div>
		</>
	);
};

export default Task;
