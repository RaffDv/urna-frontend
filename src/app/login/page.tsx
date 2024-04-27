"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import topCloud from "@/img/top-cloud.svg";
import bottomCircle from "@/img/bottom-circle.svg";
import urnaIf from "@/img/urnaif.svg";
import iconBack from "@/img/icon-back.svg";
import { Input } from "@/components/Input/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";

const schema = z.object({
	email: z.string().email("*O campo deve ser um email"),
	password: z.string().min(6, "*Senha inválida."),
});

type formProps = z.infer<typeof schema>;

export default function Home() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const {
		actions: { login },
	} = AuthStore();

	const router = useRouter();

	const handleForm = async (data: formProps) => {
		const executeLogin = async () => {
			const cookie = await login({ ...data });

			if (cookie !== undefined) {
				return cookie;
			} else {
				throw new Error("Email e/ou senha incorretos!");
			}
		};
		toast.promise(executeLogin, {
			loading: "Carregando...",
			duration: 3000,

			success: (cookie) => {
				router.push(`/admin/dashboard?access_token=${cookie}`);
				return "Login efetuado";
			},
			error: "Email e/ou senha incorretos",

			style: {
				position: "absolute",
				right: "60rem",
				boxShadow: "1px 2px 20px 6px #555",
			},
		});

		// console.log(data)
	};
	return (
		<main id="login">
			<div className="left-panel">
				<Image id="topLeftCloud" src={topCloud} alt=""></Image>
				<Image id="bottomLeftCircle" src={bottomCircle} alt=""></Image>

				<form action="POST" id="loginForm" onSubmit={handleSubmit(handleForm)}>
					<button
						id="goBackLoginToHome"
						onClick={(e) => {
							e.preventDefault();
							router.back();
						}}
					>
						<Image id="iconBack" src={iconBack} alt="Voltar"></Image>
					</button>

					<h1>Login</h1>
					<Input label="Email" type="email" {...register("email")} required />
					<Input
						label="Senha"
						type="password"
						{...register("password")}
						required
					/>

					<button type="submit">Entrar</button>
				</form>
			</div>

			<div className="right-panel">
				<Image id="urnaIf" src={urnaIf} alt=""></Image>
			</div>
		</main>
	);
}
