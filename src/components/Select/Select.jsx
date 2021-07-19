import React from "react";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectHome = (props) => {
	const { submit } = props;

	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<div className="select">
			<FormControl onChange={submit}>
				<InputLabel htmlFor="availability">Filtrer</InputLabel>
				<Select native value={value} onChange={(value) => handleChange(value)}>
					<option value="all">Voir tous</option>
					<option value="todo">A faire</option>
					<option value="done">Terminé</option>
				</Select>
			</FormControl>
		</div>
	);
};

export default SelectHome;
