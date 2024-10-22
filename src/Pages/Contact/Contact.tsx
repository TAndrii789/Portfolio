import "./Conatct.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

interface ComponentAProps {
  onClick: () => void; 
}
export const Contact: React.FC<ComponentAProps> = ({ onClick }) =>  {
	const form: any = useRef();

	const sendEmail = (e: any) => {
		e.preventDefault();

		emailjs
			.sendForm("service_bvqgwuy", "template_tk3r0i1", form.current, {
				publicKey: "Xibf18pA3r3xUWwtY",
			})
			.then(
				() => {
					console.log("SUCCESS!");
					e.target.reset();
				},
				(error) => {
					console.log("FAILED...", error.text);
				}
			);
	};




	return (
		<div className="contact-content" id="contact">
			<div className="atom-loader">
				<div className="line line-1"></div>
				<div className="line line-2"></div>
				<div className="line line-3"></div>
			</div>
			<div className="contact-containers">
				<form ref={form} onSubmit={sendEmail}>
					<h1>
						Write me a Message <p>. . .</p>
					</h1>
					<label>Your Name</label>
					<input className="inp-text" type="text" name="user_name" />
					<label>Your Email</label>
					<input className="inp-email" type="email" name="user_email" />
					<label>Message</label>
					<textarea name="message" />
					<input className="send" type="submit" value="Send" onClick={onClick}/>
				</form>
				
			</div>
		</div>
	);
};
