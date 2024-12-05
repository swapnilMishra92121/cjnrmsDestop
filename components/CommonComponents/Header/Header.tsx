import Image from "next/image"
import { ButtonComponents } from "../Fields/Button/ButtonComponents"
import logo from '../../../assets/icons/newlogo.png'
import { HeaderIProps } from "./HeaderI"

export const Header: React.FC<HeaderIProps> = ({
    handleDownload
}) => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Image src={logo} alt="logo" width={100} className="logo" />
				<div style={{ display: 'flex' }}>
					<ButtonComponents name="Impound" />
					<ButtonComponents name="New Ticket" />
					<ButtonComponents name="Print Ticket" handleClick={handleDownload} />
				</div>
			</div>
		</>
	)
}
