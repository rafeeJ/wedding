export const PlusOneForm = () => {
  return (
    <section>
      <h1>please enter the details for your plus one:</h1>
      <form className={"grid gap-2 place-items-start"}>
        <input type={"text"} placeholder={"First Name"} name={"first_name"} />
        <input type={"text"} placeholder={"Last Name"} name={"last_name"} />
        <button type={"submit"}>Submit</button>
      </form>
    </section>
  );
};
