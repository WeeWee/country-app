import {
	ArrowRightCircleIcon,
	ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
const Buttons = ({ offset, length }: { offset: number; length: number }) => {
	return (
		<footer className="flex justify-between items-center w-full px-10 py-10 ">
			<Link to={`/?offset=${offset > 0 ? offset - length : offset}`}>
				<ArrowLeftCircleIcon className="w-14 h-14 dark:text-light-color dark:hover:text-secondary-color" />
			</Link>
			<Link to={`/?offset=${offset + length}`}>
				<ArrowRightCircleIcon className="w-14 h-14 dark:text-light-color dark:hover:text-secondary-color" />
			</Link>
		</footer>
	);
};

export default Buttons;
