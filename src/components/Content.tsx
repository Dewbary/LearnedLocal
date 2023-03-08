import { api } from "~/utils/api";

const Content = () => {
  const { data: experiences, isLoading } = api.experience.getAll.useQuery();
  const createExperience = api.experience.create.useMutation();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {experiences?.map((entry, index) => {
          return (
            <div key={index}>
              <p>{entry.title}</p>
              <span>- {entry.content}</span>
            </div>
          );
        })}
      </div>

      {/* <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          createExperience.mutate({
            title: e.currentTarget.value
          })
        }}
      >
        
      </form> */}

      <input
        type="text"
        placeholder="Experience Title"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createExperience.mutate({
              title: e.currentTarget.value,
              content: "test content",
              price: 18.88,
            });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default Content;
