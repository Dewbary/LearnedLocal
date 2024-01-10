import AdminNavBar from "~/components/Admin/AdminNavBar";
import { NextStudio } from "next-sanity/studio";
import defineConfig from "@learnedlocal/sanity";

const Studio = () => {
  return (
    <div className="h-screen w-full">
      <AdminNavBar />

      <div className="m-16">
        <NextStudio config={defineConfig} />
      </div>
    </div>
  );
};

export default Studio;
