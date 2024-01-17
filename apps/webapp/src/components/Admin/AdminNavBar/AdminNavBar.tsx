import Link from "next/link";
import * as React from "react";

const AdminNavBar = () => {
  return (
    <div className="navbar bg-slate-600 text-white">
      <div className="flex-1">
        <Link className="text-xl btn btn-ghost" href="/admin">
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
          <li>
            <Link href="/admin/kpi">KPIs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavBar;
