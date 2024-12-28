const UserCard = ({ user , isFeed = true }:{user:any, isFeed:boolean}) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className={"card bg-base-300 w-96 shadow-xl"+ (isFeed?"":" pt-4")}>
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
       {
        isFeed &&  <div className="card-actions justify-center my-4">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
       }
      </div>
    </div>
  );
};
export default UserCard;
