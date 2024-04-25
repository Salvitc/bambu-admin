import { SearchOutlined } from "@ant-design/icons"
import { Image, Input, Popover, Typography } from "antd"
import logo from "../assets/bambu-logo.png"
import React from "react"
const Header = () => {
  const content = (
    <div className="flex flex-col gap-2 bg-green-50">
      <a href="/profile" className="text-gray-600 hover:text-gray-900">Perfil</a>
      <a href="/logout" className="text-gray-600 hover:text-gray-900">Cerrar Sesión</a>
    </div>
  )

  return (
    <nav className="px-4 flex justify-between items-center border-b-2 z-50">
      <div className="flex flex-row items-center">
        <Image width={70} src={logo}/>
        <Typography.Title className="mt-4">Bambú Shop</Typography.Title>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <Input size="large" placeholder="Buscar" prefix={<SearchOutlined />} />
        </div>
        <Popover placement="bottom" title="Usuario" content={content}>
          <img src="https://randomuser.me/api/portraits/thumb/men/75.jpg" alt="user" className="rounded-full h-10 w-10"/>
        </Popover>
      </div>
    </nav>
  )
}

export default Header
