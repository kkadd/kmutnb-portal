import React from "react";
import { Chip } from "@nextui-org/react";

interface Role {
  name: string;
  color: string;
}

interface RoleChipsProps {
  roles: string[];
}

export const roleColor: Role[] = [
  { name: "student", color: "bg-orange-300" },
  {
    name: "exchange_student",
    color: "bg-amber-300",
  },
  { name: "alumni", color: "bg-red-300" },
  {
    name: "templecturer",
    color: "bg-indigo-300",
  },
  { name: "personel", color: "bg-sky-300" },
  { name: "retirement", color: "bg-violet-300" },
  { name: "Admin", color: "bg-blue-300" },
  { name: "Staff", color: "bg-green-300" },
];

const RoleChips: React.FC<RoleChipsProps> = ({ roles }) => {
  roles.sort((a, b) => a.length - b.length);

  return (
    <div className="flex flex-wrap justify-stretch gap-2">
      {roles.map((role, index) => (
        <Chip
          key={index}
          variant="flat"
          classNames={{
            base: `${findColor(role)}`,
            content: "text-white font-medium drop-shadow shadow-black",
          }}
        >
          {role}
        </Chip>
      ))}
    </div>
  );
};

function findColor(roleName: any) {
  const foundRole = roleColor.find((role) => role.name === roleName);
  return foundRole ? foundRole.color : "bg-gray-300";
}

export default RoleChips;
