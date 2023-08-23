const Customer = (param) => {
  return (
    <div>
      <CustomerProfile id={param.id} image={param.image} name={param.name}/>
      <CustomerInfo birthday={param.birthday} gender={param.gender} job={param.job}/>
    </div>
  );
}

const CustomerProfile = (param) => {
  return (
    <div>
      <img src={param.image} alg="profile"/>
      <h2>{param.name}({param.id})</h2>
    </div>

  )
}

const CustomerInfo = (param) => {
  return (
    <div>
      <p>{param.birthday}</p>
      <p>{param.gender}</p>
      <p>{param.job}</p>
    </div>
  )
}

export default Customer;