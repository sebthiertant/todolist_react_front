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
	const [error, setError] = useState(null);
	// const [open, setOpen] = useState(false);
	useEffect(() => {
		setInitialTasks(Fakes);
	}, []);

	const checkboxChange = (index) => {
		let tasks = initialTasks;
		tasks[index].checked = !tasks[index].checked;
		setInitialTasks([...tasks]);
	};

	const onEditClick = (index, title, content) => {
		// setOpen(true);
		console.log("edit", index);
		console.log(title, content);
	};

	const modalClosed = () => {
		// setOpen(false);
		console.log("modale fermée");
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
		console.log("delete all tasks");
		setInitialTasks([]);
	};

	const inputChange = (e) => {
		setInput(e.target.value);
	};

	function rand() {
		return Math.round(Math.random() * 20) - 10;
	}

	function getModalStyle() {
		const top = 50 + rand();
		const left = 50 + rand();

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
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	}));

	const SimpleModal = () => {
		const classes = useStyles();
		// getModalStyle is not a pure function, we roll the style only on the first render
		const [modalStyle] = useState(getModalStyle);
		const [open, setOpen] = useState(false);

		const handleOpen = () => {
			setOpen(true);
		};

		const handleClose = () => {
			setOpen(false);
		};

		const body = (
			<div style={modalStyle} className={classes.paper}>
				<h2 id="simple-modal-title">Ma modale</h2>
				<p id="simple-modal-description">Ceci est une modale</p>
				<OutlinedInput
					placeholder="Saisir le titre et contenu"
					// onChange={(e) => inputChange(e)}
					// value={input}
				/>
			</div>
		);
		return (
			<div>
				<button type="button" onClick={handleOpen}>
					Open Modal
				</button>
				<Modal
					open={open}
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
				<SimpleModal />
			</div>
		</div>
	);
}

export default App;
