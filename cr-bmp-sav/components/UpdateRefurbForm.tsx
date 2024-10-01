const UpdateRefurbForm = () => {
    const handleRefurbUpdate = (e: React.FormEvent<HTMLFormElement>) => {}
    return (
        <form 
            id={"updateRefurbForm"}
            onSubmit={(e) => handleRefurbUpdate(e)}
        >
            <p>update Refurb Form</p>
        </form>
    );
}

export default UpdateRefurbForm;