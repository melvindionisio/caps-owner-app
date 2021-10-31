import { Slide, Container, Button } from "@material-ui/core";
import Navbar from "./../components/Navbar";

const Rooms = () => {
	return (
		<Slide in={true} direction="left">
			<Container disableGutters maxWidth="xl">
				<Navbar title="ROOMS">
					<Button variant="contained" disableElevation color="primary">
						Edit
					</Button>
				</Navbar>
			</Container>
		</Slide>
	);
};

export default Rooms;
