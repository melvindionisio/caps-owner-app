import { Box, Divider, Typography, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	editIcon: {
		justifySelf: "end",
	},
	subCategory: {
		display: "grid",
		gridTemplateColumns: "1fr .3fr",
		alignItems: "center",
		padding: "0 1rem",
		marginTop: ".2rem",
		marginBottom: ".3rem",
	},
});

const SubCategory = ({ title }) => {
	const classes = useStyles();
	return (
		<>
			<Box className={classes.subCategory}>
				<Typography variant="button" color="textSecondary">
					{title}
				</Typography>
				<Button
					size="small"
					className={classes.editIcon}
					startIcon={<EditIcon fontSize="small" />}
					color="primary"
					variant="outlined"
				>
					Edit
				</Button>
			</Box>

			<Divider orientation="horizontal" fullWidth />
		</>
	);
};

export default SubCategory;
