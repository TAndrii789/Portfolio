import { useEffect } from "react";
import { ReactSvg } from "../../assets/ReactSvg";
import "./Home.css";
import photo from "../../assets/img/1.jpg";
import linkedin from "../../assets/svg/linkedin.svg";
import github from "../../assets/svg/github.svg";
import { Projects } from "../Projects/Projects";
import CV from "../../assets/CV.pdf"

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
					(body as HTMLElement).style.overflow = "auto";
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


	return (
		<>
			<div className="nav-bar start-animation">
				<div className="inside-nav">
					<div className="logo"> {htmlContent}</div>
					<div className="navigation">
						<p className="about-me">About Me</p>
						<p className="projects-nav">Projects</p>
						<p className="contact">Contact</p>
						<button><a href={CV} download className="download-btn">Resume</a></button>
					</div>
				</div>
			</div>
			<div className="content">
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
				<a href="https://github.com/TAndrii789" target="_blank">
					<img className="github" src={github} alt="" />
				</a>

				<a href="https://www.linkedin.com/in/andrii-tomkiv-887162303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
					<img className="linkedin" src={linkedin} alt="" />
				</a>

				<p className="gmail-line">Andrii Tomkiv</p>

				<div className="crypto">
					<img src="" alt="" />
					<p></p>
				</div>
			</div>
			<Projects />
		</>
	);
};
