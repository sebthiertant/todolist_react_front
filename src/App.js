import Task from "./components/Task/Task";
import Select from "./components/Select/Select";
import { useState, useEffect } from "react";
import Fakes from "./fakeDatas/taskAPI";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function App() {
	const [initialTasks, setInitialTasks] = useState([]);
	const [input, setInput] = useState("");
	const [editTask, setEditTask] = useState("");
	const [editIndex, setEditIndex] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setInitialTasks(Fakes);
	}, []);

	const checkboxChange = (index) => {
		let tasks = initialTasks;
		tasks[index].checked = !tasks[index].checked;
		setInitialTasks([...tasks]);
	};

	const onEditClick = (index, title, content) => {
		setOpenModal(true);
		setEditIndex(index);
		setEditTask(title + " " + content);
	};

	const onDeleteClick = (index) => {
		const taskList = initialTasks;
		taskList.splice(index, 1);
		setInitialTasks([...taskList]);
	};

	const addTask = () => {
		const inputSplit = input.split(" ");

		initialTasks.push({
			id: initialTasks.length,
			title: inputSplit[0],
			content: inputSplit.slice(1).join(" "),
			checked: false,
			image: "",
		});
		setInput("");
	};

	const deleteAllTasks = () => {
		setInitialTasks([]);
	};

	const inputChange = (e) => {
		setInput(e.target.value);
	};

	const editInputChange = (e) => {
		setEditTask(e.target.value);
	};

	const editTaskContent = () => {
		let newTaskContents = initialTasks;
		const editSplit = editTask.split(" ");
		const newTitle = editSplit[0];
		const newContent = editSplit.slice(1).join(" ");
		newTaskContents[editIndex].title = newTitle;
		newTaskContents[editIndex].content = newContent;
		setInitialTasks([...newTaskContents]);
		setOpenModal(false);
	};

	function getModalStyle() {
		const top = 50;
		const left = 50;

		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		};
	}

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: 400,
			color: "white",
			fontFamily: "Roboto, sans-serif",
			backgroundColor: "rgba(48, 43, 99, 0.6)",
			boxShadow: theme.shadows[4],
			padding: theme.spacing(2, 4, 3),
			borderRadius: "12px",
		},
	}));

	const SimpleModal = (openModal) => {
		const classes = useStyles();
		const [modalStyle] = useState(getModalStyle);

		const handleClose = () => {
			setOpenModal(false);
			setEditTask("");
		};

		const body = (
			<div style={modalStyle} className={classes.paper}>
				<h2 id="simple-modal-title">Modifier la tâche</h2>
				<OutlinedInput
					autoFocus={true}
					style={{ fontSize: 20, border: "1px solid white", color: "white" }}
					placeholder="Saisir le titre et contenu"
					onChange={(e) => editInputChange(e)}
					value={editTask}
				/>
				<IconButton
					onClick={editTaskContent}
					style={{
						padding: "18px 36px",
						fontSize: "18px",
						color: "white",
					}}
				>
					<AddCircleIcon style={{ fontSize: 40 }} />
				</IconButton>
			</div>
		);

		return (
			<div>
				<Modal
					open={openModal}
					onClose={handleClose}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					{body}
				</Modal>
			</div>
		);
	};

	return (
		<div className="App">
			<div className="navbar">
				<Select />
				<OutlinedInput
					placeholder="Saisir le titre et contenu"
					onChange={(e) => inputChange(e)}
					value={input}
				/>
				<div className="navbar_buttons">
					<IconButton onClick={addTask}>
						<AddCircleIcon color="primary" style={{ fontSize: 40 }} />
					</IconButton>
					<IconButton onClick={deleteAllTasks}>
						<DeleteForeverIcon color="secondary" style={{ fontSize: 40 }} />
					</IconButton>
				</div>
			</div>
			<div className="task_container">
				{initialTasks != null
					? initialTasks.map((task, index) => {
							const { title, content } = task;
							return (
								<Task
									key={index}
									title={title}
									content={content}
									done={initialTasks[index].checked}
									checkboxChange={() => checkboxChange(index)}
									onEditClick={() => onEditClick(index, title, content)}
									onDeleteClick={() => onDeleteClick(index)}
								/>
							);
					  })
					: error}
			</div>
			{openModal ? <SimpleModal open={openModal} /> : null}
		</div>
	);
}

export default App;
