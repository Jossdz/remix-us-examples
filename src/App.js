/* eslint-disable jsx-a11y/alt-text */
import {
	Deck,
	Slide,
	Heading,
	CodePane,
	FlexBox,
	Grid,
	Text,
	Link,
	UnorderedList,
	ListItem,
	OrderedList,
	Image
} from "spectacle";
import cb from "react-syntax-highlighter/dist/cjs/styles/prism/cb";

import remixlogo from "./svg/remix.svg";
import teamliquidlogo from "./svg/teamliquid.svg";

const theme = {
	colors: {
		primary: "#dcdcdc",
		text: "#DcDcDc",
		secondary: "#31dafb",
		bgc: "#212121",
		link: "#0f0"
	},
	fontSizes: {
		header: "60px",
		paragraph: "28px",
		list: "25px"
	}
};

function TSlide(props) {
	return (
		<Slide backgroundColor="bgc" {...props}>
			{props.children}
		</Slide>
	);
}

const App = () => (
	<Deck theme={theme}>
		<TSlide>
			<Grid gridTemplateRows="1fr auto" style={{ height: "100%" }}>
				<FlexBox justifyContent="center">
					<Heading
						color="primary"
						style={{ display: "flex", alignItems: "center" }}
					>
						<img src={remixlogo} width="310" style={{ marginRight: "-35px" }} />
						y la experiencia de usuario
					</Heading>
				</FlexBox>
				<FlexBox justifyContent="center" alignItems="flex-end">
					<h2>@jossdz</h2>
				</FlexBox>
			</Grid>
		</TSlide>

		<Slide backgroundColor="bgc">
			<Grid gridTemplateRows="0.8fr 2fr auto">
				<Heading>Sobre mi</Heading>

				<FlexBox justifyContent="center">
					{/*  */}
					<img src={teamliquidlogo} width="120" />
				</FlexBox>
				<FlexBox justifyContent="center">
					<ul>
						<li>Ing. en sistemas computacionales</li>
						<li>Comunidades en tech</li>
						<li>Educación + Tech</li>
					</ul>
				</FlexBox>
			</Grid>
		</Slide>

		<TSlide>
			<Grid gridTemplateRows="1fr auto">
				<Heading>¿Qué es?</Heading>
				<UnorderedList>
					<ListItem>Nuevo framework web (React)</ListItem>
					<ListItem>Utiliza SSR (Server Side Render)</ListItem>
					<ListItem>
						De los creadores de <i>react-router-dom</i>
					</ListItem>
					<ListItem>Utiliza el principio de usar la plataforma</ListItem>
					<ListItem>
						Es una excelente herramienta para aprender sobre la web
					</ListItem>
				</UnorderedList>
			</Grid>
		</TSlide>

		<TSlide>
			<Image src="https://i.postimg.cc/NFBbgktW/Con-JS-2.png" />
		</TSlide>

		<TSlide>
			<FlexBox justifyContent="center" height="100%">
				<Heading>¿Qué tiene que ver con la experiencia del usuario?</Heading>
			</FlexBox>
		</TSlide>

		<TSlide>
			<Grid gridTemplateRows="1fr auto">
				<Heading>1. SSR + No JS</Heading>
				<FlexBox justifyContent="center" flexDirection="column">
					<p>Ver /examples/one</p>
					<Image src="https://i.postimg.cc/bNGvV7SM/Con-JS.png" width="800" />
				</FlexBox>
			</Grid>
		</TSlide>

		<TSlide>
			<FlexBox
				justifyContent="center"
				alignContent="center"
				flexDirection="column"
				height="100%"
			>
				<h1>No JS 👍</h1>
				<br />
				<h1>Con JS 🤯</h1>
			</FlexBox>
		</TSlide>

		<TSlide>
			<Grid gridTemplateRows="1fr auto">
				<Heading>Ventajas</Heading>
				<UnorderedList>
					<ListItem>
						Buena experiencia, incluso con baja calidad de red.
					</ListItem>
					<ListItem>Buena experiencia incluso con JS deshabilitado.</ListItem>
					<ListItem>
						Remix va a enviar solo el JS necesario para la vista y no más.
					</ListItem>
					<ListItem>
						Si bien JS no es necesario, aporta mucho poder a la aplicación.
					</ListItem>
				</UnorderedList>
			</Grid>
		</TSlide>

		<TSlide>
			<Grid gridTemplateRows="1fr auto">
				<Heading>
					2. Gestiona la transición entre estados (Sin useState)
				</Heading>
				<FlexBox justifyContent="center" flexDirection="column">
					<p>
						Ver <i>/examples/two</i>
					</p>
				</FlexBox>
			</Grid>
		</TSlide>
		<TSlide>
			<FlexBox justifyContent="center" height="100%" flexDirection="column">
				<Heading>GET</Heading>
				<h2>idle → submitting → idle</h2>
				<h2 style={{ opacity: 0.7 }}>inactivo → enviando → inactivo</h2>
				<Heading>POST, PUT, PATCH, DELETE</Heading>
				<h2>idle → submitting → loading → idle</h2>
				<h2 style={{ opacity: 0.7 }}>
					inactivo → enviando → cargando → inactivo
				</h2>
			</FlexBox>
		</TSlide>

		<TSlide>
			<Image src="https://i.postimg.cc/0QcKwYDg/Con-JS-3.png" />
		</TSlide>

		<TSlide>
			<Heading margin="0px">Ventajas:</Heading>
			<UnorderedList>
				<ListItem>
					Puedes cambiar la interfaz a tu gusto/necesidad en cada etapa de la
					transición.
				</ListItem>
				<ListItem>Puedes manejar pending-ui</ListItem>
				<ListItem>Puedes manejar optimistic-hi</ListItem>
			</UnorderedList>
			<Heading margin="0px">Desventajas:</Heading>
			<UnorderedList>
				<ListItem>
					La transicion es un elemento singular que se dispara en cada
					transicion.
				</ListItem>
			</UnorderedList>
		</TSlide>

		<TSlide>
			<FlexBox justifyContent="center" flexDirection="column">
				<Heading margin="0px">Mutaciones en paralelo</Heading>

				<p>
					Ver <em>/examples/six</em>
				</p>
			</FlexBox>

			<p style={{ fontSize: "28px" }}>
				Cambiar el useTransition al hook, useFetcher nos permite hacer las
				mutaciones en paralelo, sin necesidad de esperar a que se complete la
				anterior y cada uno de los elementos se comoporta acorde al estado de su
				fetcher.
			</p>
		</TSlide>

		<TSlide>
			<FlexBox justifyContent="center" flexDirection="column">
				<Heading margin="0px">Optimistic UI</Heading>
				<p>Ver `/examples/seven`</p>
			</FlexBox>
			<p style={{ fontSize: "30px" }}>
				Al momento de enviar la informacion, durante una transición (con{" "}
				<i>useTransition</i> o <i>useFetcher</i>, la información que envias está
				disponible en la propiedad submission.{" "}
			</p>

			<p style={{ fontSize: "30px" }}>
				Si hay errores, puedes devolver informacion al respecto y accederla a
				travez de la propiedad data
			</p>
		</TSlide>

		<TSlide>
			<FlexBox height="100%" justifyContent="center" alignItems="center">
				<Heading>Gracias!</Heading>
			</FlexBox>
		</TSlide>
	</Deck>
);

export default App;
