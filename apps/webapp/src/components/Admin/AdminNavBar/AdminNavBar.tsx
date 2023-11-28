import Link from "next/link";
import * as React from "react";

type Props = {};

const AdminNavBar = ({}: Props) => {
  return (
    <div className="navbar bg-slate-600 text-white">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/admin">
          LL Admin
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/admin">Experiences</Link>
          </li>
          <li>
            <Link href="/admin/textlist">TextList</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavBar;
