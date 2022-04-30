const PageNotFoundError = () => {
  return (
    <div className='card shadow-lg p-3 mb-5 bg-body rounded mt-5'>
      <div className='card-body d-flex flex-column align-items-center gap-3'>
        <h1 className=''>404</h1>
        <h2 className='card-title '>Page Not Found</h2>
        <p className='card-text'>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFoundError;
