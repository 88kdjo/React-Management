import './App.css';

import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'image': 'https://via.placeholder.com/64/64/1',
    'name': '홍길동',
    'birthday': '901122',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://via.placeholder.com/64/64/2',
    'name': '김우리',
    'birthday': '990304',
    'gender': '여자',
    'job': '대학생'
  },
  {
    'id': 3,
    'image': 'https://via.placeholder.com/64/64/3',
    'name': '주하나',
    'birthday': '001011',
    'gender': '여자',
    'job': '대학생'
  },
]

const App = () => {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        })
      }
    </div>
  );
}

export default App;