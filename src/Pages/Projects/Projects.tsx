import cryptoPhoto from "../../assets/img/crypto.png";
import numpazPhoto from "../../assets/img/numpaz.png";
import pairPhoto from "../../assets/img/pair.png";
import github from "../../assets/originSvg/originGithub.svg";
import "./Projects.css";

export const Projects = () => {
	return (
		<div className="projects-root" id="projects">
			<hr className="project-hr" />
			<div className="projects">
				<h2>Projects I've built</h2>
				<div className="crypto">
					<img src={cryptoPhoto} className="cryptoPhoto  sample1" />
					<div className="text1 sample1">
						<h3>CryptoCurrency</h3>
						<h4>
							Changing is coming and currency doesn't stay aside. The app helps
							you to be on time with money in the crypto world and track your
							investments.
						</h4>
						<span>
							<a
								href="https://github.com/TAndrii789/CryptoCurrency.git"
								target="_blank"
							>
								<img className="github" src={github} alt="" />
							</a>
							<a className="try" href="\Portfolio\CryptoCurrency\index.html" target="_blank" rel="noopener noreferrer">Try It</a>
						</span>
					</div>
				</div>
				


				
				<div className="numpaz">
					<div className="text2 sample2">
						<h3>Numpuz</h3>
						<h4>
							Changing is coming and currency doesn't stay aside. The app helps
							you to be on time with money in the crypto world and track your
							investments.
						</h4>
						<span>
							<a
								href="https://github.com/TAndrii789/numpuz.git"
								target="_blank"
							>
								<img className="github" src={github}/>
							</a>
							<a className="try" href="\Portfolio\Numpuz\index.html" target="_blank" rel="noopener noreferrer">Try It</a>
						</span>
					</div>
					<img src={numpazPhoto} className="numpazPhoto sample2" />
				</div>

				<div className="pair">
					<img src={pairPhoto} className="pairPhoto sample3" />
					<div className="text3 sample3">
						<h3>Find-a-Pair</h3>
						<h4>
							Changing is coming and currency doesn't stay aside. The app helps
							you to be on time with money in the crypto world and track your
							investments.
						</h4>
						<span>
							<a
								href="https://github.com/TAndrii789/find-a-pair.git"
								target="_blank"
							>
								<img className="github" src={github} alt="" />
							</a>
							<a className="try" href="\Portfolio\Find-a-Pair\index.html" target="_blank" rel="noopener noreferrer">Try It</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
