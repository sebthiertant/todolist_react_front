import Task from "./components/Task/Task";
import SelectHome from "./components/Select/Select";
import Footer from "./components/Footer/Footer";
import LoadingLottie from "./components/LoadingLottie/LoadingLottie";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import loading from "./assets/loading_animation.json";

function App() {
	const [initialTasks, setInitialTasks] = useState([]);
	const [input, setInput] = useState("");
	const [editTask, setEditTask] = useState("");
	const [editIndex, setEditIndex] = useState();
	const [openModal, setOpenModal] = useState(false);
	const [error, setError] = useState(null);
	const [selectValue, setSelectValue] = useState(null);
	const [cursorPositionStart, setCursorPositionStart] = useState(0);
	const [cursorPositionEnd, setCursorPositionEnd] = useState(0);

	// axios
	const axios = require("axios");

	// initial fetch to get the tasks from MongoDB
	useEffect(() => {
		axios
			.get("http://localhost:5500/tasks")
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					setError("Error");
				}
			})
			.then((data) => {
				setInitialTasks(data);
			});
	}, [axios]);
	// Test de initialTasks dans le useEffect pour get les données à chaque changement du state

	const checkboxChange = (index) => {
		let tasks = initialTasks;
		const taskID = initialTasks[index]._id;
		const taskTitle = initialTasks[index].title;
		const taskContent = initialTasks[index].content;
		let taskChecked = !tasks[index].checked;
		tasks[index].checked = taskChecked;
		axios
			.put("http://localhost:5500/tasks/" + taskID, {
				checked: taskChecked,
				title: taskTitle,
				content: taskContent,
			})
			.catch(function (error) {
				console.log("Creation Task error : " + error);
			});

		setInitialTasks([...tasks]);
	};

	const onEditClick = (index, title, content) => {
		setOpenModal(true);
		setEditIndex(index);
		setEditTask(title + " " + content);
	};

	const onDeleteClick = (index) => {
		const taskList = initialTasks;
		const taskID = initialTasks[index]._id;
		taskList.splice(index, 1);
		setInitialTasks([...taskList]);

		axios
			.delete("http://localhost:5500/tasks/" + taskID)
			.catch(function (error) {
				console.log("Creation Task error : " + error);
			});
	};

	const addTask = () => {
		if (input.length <= 0) return;
		const inputSplit = input.split(" ");
		const newTitle = inputSplit[0];
		const newContent = inputSplit.slice(1).join(" ");

		axios
			.post("http://localhost:5500/tasks", {
				title: newTitle,
				content: newContent,
			})
			.catch(function (error) {
				console.log("Creation Task error : " + error);
			});

		initialTasks.push({
			id: initialTasks.length,
			title: newTitle,
			content: newContent,
			checked: false,
			image: "",
		});
		setInput("");
	};

	const deleteAllTasks = () => {
		setInitialTasks([]);

		axios.delete("http://localhost:5500/tasks/").catch(function (error) {
			console.log("Creation Task error : " + error);
		});
	};

	const inputChange = (e) => {
		setInput(e.target.value);
	};

	const inputRef = useRef();

	const EditInputChange = (e) => {
		setEditTask(e.target.value);
		setCursorPositionStart(inputRef.current.selectionStart);
		setCursorPositionEnd(inputRef.current.selectionEnd);

		// inputRef.current.selectionStart = cursorPositionStart;
		// inputRef.current.selectionEnd = cursorPositionEnd;
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

		const task = initialTasks[editIndex];
		const taskID = task._id;
		let taskChecked = task.checked;
		axios
			.put("http://localhost:5500/tasks/" + taskID, {
				checked: taskChecked,
				title: newTitle,
				content: newContent,
			})
			.catch(function (error) {
				console.log("Creation Task error : " + error);
			});
	};

	const SelectChange = (value) => {
		useEffect(() => {
			setSelectValue(value);
		}, [value]);
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
				<div className="modale_top">
					<IconButton
						onClick={handleClose}
						style={{
							padding: "18px 36px",
							fontSize: "18px",
						}}
					>
						<CancelIcon
							color="secondary"
							style={{ fontSize: 40, color: "#ad3234" }}
						/>
					</IconButton>
					<h2 id="simple-modal-title">Modifier la tâche</h2>
				</div>
				<OutlinedInput
					autoFocus={true}
					style={{ fontSize: 20, border: "1px solid white", color: "white" }}
					placeholder="Saisir le titre et contenu"
					onChange={(e) => EditInputChange(e)}
					value={editTask}
					fullWidth={true}
					inputRef={inputRef}
				/>
				<div className="buttonAdd_container">
					<IconButton
						onClick={editTaskContent}
						style={{
							padding: "18px 36px",
							fontSize: "18px",
							color: "white",
						}}
					>
						<CheckIcon color="inherit" style={{ fontSize: 40 }} />
					</IconButton>
				</div>
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
				<SelectHome selectChange={SelectChange} />
				<OutlinedInput
					placeholder="Saisir le titre et contenu"
					onChange={(e) => inputChange(e)}
					value={input}
				/>
				<div className="navbar_buttons">
					<IconButton onClick={addTask}>
						<AddCircleIcon
							color="primary"
							style={{ fontSize: 40, color: "#1975bd" }}
						/>
					</IconButton>
					<IconButton onClick={deleteAllTasks}>
						<DeleteForeverIcon
							color="secondary"
							style={{ fontSize: 40, color: "#ad3234" }}
						/>
					</IconButton>
				</div>
			</div>
			<div className="task_container">
				{initialTasks != null && selectValue === "all" ? (
					initialTasks.map((task, index) => {
						const { title, content } = task;
						return (
							<Task
								key={index}
								title={title}
								content={content}
								done={task.checked}
								checkboxChange={() => checkboxChange(index)}
								onEditClick={() => onEditClick(index, title, content)}
								onDeleteClick={() => onDeleteClick(index)}
							/>
						);
					})
				) : initialTasks != null && selectValue === "todo" ? (
					initialTasks
						.filter((task) => task.checked === false)
						.map((task, index) => {
							const { title, content } = task;
							return (
								<>
									<Task
										key={index}
										title={title}
										content={content}
										done={task.checked}
										checkboxChange={() => checkboxChange(index)}
										onEditClick={() => onEditClick(index, title, content)}
										onDeleteClick={() => onDeleteClick(index)}
									/>
								</>
							);
						})
				) : initialTasks != null && selectValue === "done" ? (
					initialTasks
						.filter((task) => task.checked === true)
						.map((task, index) => {
							const { title, content } = task;
							return (
								<Task
									key={index}
									title={title}
									content={content}
									done={task.checked}
									checkboxChange={() => checkboxChange(index)}
									onEditClick={() => onEditClick(index, title, content)}
									onDeleteClick={() => onDeleteClick(index)}
								/>
							);
						})
				) : (
					<div
						style={{
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<LoadingLottie lotti={loading} height={300} width={300} />
					</div>
				)}
			</div>
			{openModal ? <SimpleModal open={openModal} /> : null}
			<Footer author="Sébastien Thiertant" year="2021" />
		</div>
	);
}

export default App;
