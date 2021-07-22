import React from "react";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectHome = (props) => {
	const { selectChange } = props;

	const [selectValue, setSelectValue] = useState("all");

	const handleChange = (event) => {
		setSelectValue(event.target.value);
	};

	return (
		<div className="select">
			<FormControl onChange={selectChange(selectValue)}>
				<InputLabel htmlFor="availability">Filtrer</InputLabel>
				<Select
					native
					value={selectValue}
					onChange={(value) => handleChange(value)}
				>
					<option value="all">Voir tous</option>
					<option value="todo">A faire</option>
					<option value="done">Terminé</option>
				</Select>
			</FormControl>
		</div>
	);
};

export default SelectHome;
