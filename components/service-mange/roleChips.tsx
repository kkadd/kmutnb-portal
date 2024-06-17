import React from "react";
import { Chip } from "@nextui-org/react";

interface Role {
  name: string;
  color: string;
}

interface RoleChipsProps {
  roles: string[];
}

enum displayRole {
  student = "student",
  exchange_student = "exchange_student",
  alumni = "alumni",
  templecturer = "templecturer",
  personel = "personel",
  retirement = "retirement",
}

const renderRole = (renderRole: displayRole) => {
  const name = {
    [displayRole.student]: "Student",
    [displayRole.exchange_student]: "Exchange Student",
    [displayRole.alumni]: "Alumni",
    [displayRole.templecturer]: "Templecturer",
    [displayRole.personel]: "Personel",
    [displayRole.retirement]: "Retirement",
  };
  return name[renderRole];
};

export const roleColor: Role[] = [
  { name: "Student", color: "bg-orange-300" },
  {
    name: "Exchange Student",
    color: "bg-amber-300",
  },
  { name: "Alumni", color: "bg-red-300" },
  {
    name: "Templecturer",
    color: "bg-indigo-300",
  },
  { name: "Personel", color: "bg-sky-300" },
  { name: "Retirement", color: "bg-violet-300" },
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
          {renderRole(role as displayRole)}
        </Chip>
      ))}
    </div>
  );
};

function findColor(roleName: any) {
  const foundRole = roleColor.find(
    (role) => role.name === renderRole(roleName)
  );
  return foundRole ? foundRole.color : "bg-gray-300";
}

export default RoleChips;
