import "./Conatct.css";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface ComponentAProps {
  onClick: () => void; 
}
export const Contact: React.FC<ComponentAProps> = ({ onClick }) =>  {
	const form: any = useRef();
	const name = useRef<HTMLInputElement | null>(null);
	const email = useRef<HTMLInputElement | null>(null);
	const text = useRef<HTMLTextAreaElement>(null)
	const [info, setInfo] = useState("");
 

	const validateEmail = (email: any) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(email.current) return emailPattern.test(email.current.value);
	};

	const sendEmail = (e: any) => {
		e.preventDefault();
		if(!name.current?.value){
			setInfo("Write your name");
			return;
		}else if(!validateEmail(email)){
			setInfo("Invalid email");
		}else if(!text.current?.value){
			setInfo("Write your message");
		}else{
			setInfo("");
			onClick()
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
		}
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
					<input className="inp-text" type="text" name="user_name" ref={name}/>
					<label>Your Email</label>
					<input className="inp-email" type="email" name="user_email" ref={email}/>
					<label>Message</label>
					<textarea name="message" ref={text}/>
					<input className="send" type="submit" value="Send" />
					<p
				id="information"
				className="information"
				style={{ fontSize: "13px", color: "red" }}
			>
				{info}
			</p>
				</form>
				
			</div>
		</div>
	);
};
