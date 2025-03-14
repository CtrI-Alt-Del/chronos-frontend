"use client";

import { Navbar as NavbarRoot, NavbarContent } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { useNavigation } from "@/src/ui/hooks/useNavigation";
import logo from "@/public/images/logo.svg";
import Mirror from "@/public/images/mirror";

import Image from "next/image";
import { NavbarLink } from "./navbar-link";
import Link from "next/link";
import Star from "@/public/images/star";
import Clock from "@/public/images/clock";
import Mail from "@/public/images/mail";
import Paper from "@/public/images/paper";

export function Sidebar() {
  const { currentRoute } = useNavigation();

  return (
    <NavbarRoot
      classNames={{
        base: "flex flex-col p-0 h-full w-80 border-r border-gray-border",
        wrapper: "flex flex-col p-0 h-full",
      }}
    >
      {/* Logo */}
      <div className="flex justify-center items-center mt-12 w-full">
        <Image src={logo} alt="Chronos" width={35} height={35} />
        <p className="ml-1 text-3xl font-bold text-black">Chronos</p>
      </div>

      {/* Links */}
      <NavbarContent className="flex flex-col mt-12 w-full h-full md:mt-48 hover:cursor-pointer">
        <NavbarContent className="flex flex-col gap-0 w-full">
          <NavbarLink
            href="/time-register"
            icon={
              <Star
                fill={currentRoute === "/dashboard" ? "#1200AF" : "#000000"}
              />
            }
            title="Registrar ponto"
            isActive={currentRoute === "/dashboard"}
          />

          <NavbarLink
            href="/history"
            icon={
              <Clock
                fill={currentRoute === "/history" ? "#1200AF" : "#000000"}
              />
            }
            title="Histórico de pontos"
            isActive={currentRoute === "/history"}
          />

          <NavbarLink
            href="/espelho"
            icon={
              <Mirror
                fill={currentRoute === "/mirror" ? "#1200AF" : "#000000"}
              />
            }
            title="Espelho de pontos"
            isActive={currentRoute === "/mirror"}
          />

          <NavbarLink
            href="/revisoes"
            icon={
              <Mail
                fill={currentRoute === "/revisoes" ? "#1200AF" : "#000000"}
              />
            }
            title="Revisões"
            isActive={currentRoute === "/revisoes"}
          />

          <NavbarLink
            href="/relatorio"
            icon={
              <Paper
                fill={currentRoute === "/relatorio" ? "#1200AF" : "#000000"}
              />
            }
            title="Relatório analítico"
            isActive={currentRoute === "/relatorio"}
          />
        </NavbarContent>
      </NavbarContent>

      {/* Profile */}
      <div className="flex justify-center items-center px-8 py-4 mb-4 w-full">
        <Link
          href="/profile"
          className="flex justify-start items-center pl-1 w-full h-12 rounded-xl bg-blue-primary transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:translate-y-[-2px] hover:bg-blue-600 group"
        >
          <Avatar
            color="primary"
            isBordered
            className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            radius="sm"
            // src={user.avatar}
          />
          <p className="ml-3 font-normal text-white transition-all duration-300 text-md group-hover:ml-4 group-hover:font-medium">
            Perfil
          </p>
        </Link>
      </div>
    </NavbarRoot>
  );
}
