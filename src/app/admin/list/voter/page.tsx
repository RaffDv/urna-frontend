"use client";

import IFImg from "@/img/if.svg";
import searchIcon from "@/img/search.svg";
import filterIcon from "@/img/filter.svg";
import userIcon from "@/img/user-icon.svg";
import pencilIcon from "@/img/pencil.svg";
import iconBack from "@/img/icon-back.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getCandidate } from "@/requests/candidate/findAll";
import { getVoters } from "@/requests/voter/findAll";

export default function listCandidate() {
	const router = useRouter();
	function redirectEdit() {
		router.push("/admin/editarCandidato");
	}

	const { data: candidates } = useQuery({
		queryKey: ["get voter"],
		queryFn: getVoters,
	});


	return (
		<main id="admin">
			<div id="left-column">
				<Image src={IFImg} alt="" />
			</div>
			<div id="right-column">
				<div id="nav-admin">
					<div id="info">
						<Image src={userIcon} alt="" />
						<span id="nome">Adm. Produção</span>
					</div>
					<a href="" id="logout">
						Sair
					</a>
				</div>
				<div id="head-bar">
					<h1>Listagem de Eleitores</h1>
					<div id="bar-buttons">
						<button
							id="goBackPage"
							onClick={() => {
								router.back();
							}}
						>
							<Image src={iconBack} alt="Icone botão voltar" width={45} />
						</button>
						<form id="searchPage" action="">
							<button tabIndex={2} type="submit">
								<i id="search-button" aria-hidden={true}></i>
								<Image src={searchIcon} alt="" />
							</button>
							<input
								tabIndex={1}
								type="text"
								name="Pesquisar"
								id="pesquisar"
								placeholder="Pesquisar..."
							/>
						</form>
						<div></div>
					</div>
				</div>
				<div id="box">
					<table id="table-content">
						<tbody>
							<tr>
								<th>Nome</th>
								<th>Matricula</th>
								<th>Turma</th>
								<th>Email</th>
								<th>
									<a href=""></a>
								</th>
							</tr>
							{candidates?.map((item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>{item.enrollment}</td>
									<td>{item.class}</td>
									<td>{item.email}</td>
									<td>
										<button onClick={() => router.push(`/admin/edit/${item.id}/voter`)}>
											<Image src={pencilIcon} alt="" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}
