import { useEffect } from "react";
import { ReactSvg } from "../../assets/ReactSvg";
import "./Home.css";
import photo from "../../assets/img/1.jpg";
import linkedin from "../../assets/svg/linkedin.svg";
import github from "../../assets/svg/github.svg";
import { Projects } from "../Projects/Projects";
import CV from "../../assets/CV.pdf";
import { Contact } from "../Contact/Contact.tsx";

export const Home = () => {
	const htmlContent = (
		<div className="anim-text">
			<p>at</p>
			<div className="spin-animation">
				<ReactSvg />
			</div>
			<div className="circle"></div>
			<p>m</p>
		</div>
	);

	let popUps: Array<string> = [];
	let popupAmount: number =  10;

	const addToPopupAmount = ()=>{
		popupAmount+=popUps.length * 65
	}

	const handleAnimationEnd = () => {
		const circle: Element | null = document.querySelector(".circle");
		const body: Element | null = document.querySelector("body");
		const navigation: Element | null = document.querySelector(".navigation");
		if (circle) {
			circle.classList.add("circle-expand");
			circle.addEventListener("animationend", () => {
				const content: Element | null = document.querySelector(".content");
				(content as HTMLElement).style.display = "flex";
				const startAnimation: Element | null =
					document.querySelector(".start-animation");
				(startAnimation as HTMLElement).style.width = "100vw";
				startAnimation?.classList.remove("start-animation");

				circle.classList.add("circle-shrink");
				(navigation as HTMLElement).style.display = "flex";
				circle.addEventListener("animationend", () => {
					(body as HTMLElement).style.overflowY = "auto";
				});
			});
		}
	};

	useEffect(() => {
		const animElement: Element | null =
			document.querySelector(".spin-animation");
		animElement?.addEventListener("animationend", handleAnimationEnd);
		return () => {
			animElement?.removeEventListener("animationend", handleAnimationEnd);
		};
	}, []);

	const handleRemoveCopyPopup = () => {
		const copyAnim: Element | null = document.getElementById("copy-anim");
		if (copyAnim) {
			(copyAnim as HTMLElement).style.bottom = "10px";
			copyAnim.id = "";
			const count = popUps.filter(item => item === "copy-anim").length;
			popUps = popUps.filter(item => item !== "copy-anim");
			
			if (popupAmount>10) popupAmount-=count * 65
		}
	};

	const copyText = "Andrytomkiv789@gmail.com";
	const handleCopy = () => {
		navigator.clipboard.writeText(copyText);
		const copyEl: Element | null = document.querySelector(".copy-popUp");
		

		if (copyEl) {
			copyEl.id = "copy-anim";
			const copyAnim: Element | null = document.getElementById("copy-anim");
			if (copyAnim) popUps.push(copyAnim.id);
			

			if(popupAmount>10){
				(copyAnim as HTMLElement).style.bottom = `75px`;
			}
			popupAmount = 10
			addToPopupAmount()

			copyEl.addEventListener("animationend", handleRemoveCopyPopup);
			return () => {
				copyEl.removeEventListener("animationend", handleRemoveCopyPopup);
			};
		}
	};

	const handleRemoveSendPopup = () => {
		const sendAnim: Element | null = document.getElementById("send-anim");
		if (sendAnim) {
			(sendAnim as HTMLElement).style.bottom = "10px";
			sendAnim.id = "";
			const count = popUps.filter(item => item === "send-anim").length;
			popUps = popUps.filter(item => item !== "send-anim");
			if (popupAmount>10) popupAmount-=count*65
		}
	};

	const handleClickFromComponentA = () => {
		const sendEl: Element | null = document.querySelector(".send-popUp");
		if (sendEl) {
			sendEl.id = "send-anim";
			const sendAnim: Element | null = document.getElementById("send-anim");
			if (sendAnim) popUps.push(sendAnim.id);

			if(popupAmount>10){
				(sendAnim as HTMLElement).style.bottom = `75px`;
			} 
			popupAmount = 10
			addToPopupAmount();

			sendEl?.addEventListener("animationend", handleRemoveSendPopup);
			return () => {
				sendEl?.removeEventListener("animationend", handleRemoveSendPopup);
			};
		}
	};



	return (
		<>
			<div className="nav-bar start-animation">
				<div className="inside-nav">
					<div className="logo"> {htmlContent}</div>
					<div className="navigation">
						<a className="about-me" href="#about-me">
							About Me
						</a>
						<a className="projects-nav" href="#projects">
							Projects
						</a>
						<a className="contact" href="#contact">
							Contact
						</a>
						<button>
							<a href={CV} download className="download-btn">
								Resume
							</a>
						</button>
					</div>
				</div>
			</div>
			<div className="content" id="about-me">
				<div className="greeting">
					<p>Hello, my name is</p>
					<h1>Andrii Tomkiv</h1>
					<h2>I want to introduce myself as a Front-End developer</h2>
					<p className="text">
						I'm a UX/UI developer, who specializes in building <br /> (and
						occasionally designing) projects using such <br /> technologies as
						JavaScript/TypeScript, React, and SCSS
					</p>
				</div>
				<div className="photo-container">
					<img className="photo" src={photo} alt="" />
				</div>

				<hr className="line"></hr>
				<a className="github" href="https://github.com/TAndrii789" target="_blank">
					<img className="github" src={github} alt="" />
				</a>

				<a className="linkedin"
					href="https://www.linkedin.com/in/andrii-tomkiv-887162303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
					target="_blank"
				>
					<img className="linkedin" src={linkedin} alt="" />
				</a>

				<p onClick={handleCopy} className="gmail-line">
					Andrytomkiv789@gmail.com
				</p>
				<div className="popup-container">
					<div className="copy-popUp">Copied</div>
				  <div className="send-popUp">Message heve been sent</div>
				</div>
				
			</div>
			<Projects />
			<Contact onClick={handleClickFromComponentA} />
			<div className="footer">
				<p>&copy; Andrii Tomkiv</p>
			</div>
		</>
	);
};
