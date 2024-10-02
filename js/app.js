
loadAllData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        const data = await res.json();
        const allData = data.data.tools;
        // console.log(allData);
        displayAllData(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


displayAllData = (allData) => {
    // console.log(allData);

    const cardsContainer = document.getElementById('cards-container');
    
    allData.forEach(data => {
        // console.log(data);

        const div = document.createElement('div');
        div.classList = `flex flex-col gap-3 border-2 p-5 rounded-xl`;

        let featuresLength = data.features.length;
        // console.log(featuresLength);
        
    
        div.innerHTML = `
        <div  class="h-full">
            <img
              class="rounded-xl"
              src="${data.image}"
              alt=""
            />
          </div>

          <div class="">
            <h1 class="font-bold text-xl">Features</h1>
            <p>Features Length: ${data.features.length}</p>

            <ol id="features-list" class="list-decimal px-5 text-gray-600">
                <li>Natural language processing</li>
                <li>Contextual understanding</li>
                <li>Text generation</li>
            </ol>
        </div>

          <div
            class="flex flex-row justify-between items-center border-t-2 pt-4 mt-2"
          >
            <div class="flex flex-col gap-2">
              <h1 class="font-bold text-xl">${data.name}</h1>
              <div class="flex flex-row gap-2 justify-start items-center">
                <i class="fa-regular fa-calendar-days"></i>
                <p>${data.published_in}</p>
              </div>
            </div>

            <div
              onclick="CustomShowModal(${data.id})"
              class="bg-blue-600 px-3 py-2 rounded-full cursor-pointer hover:bg-blue-400 animate-pulse"
            >
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        `;
        
        cardsContainer.appendChild(div);

        // Loading spinner
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.classList.add('hidden');
        
        const featuresList = document.getElementById('features-list');
        // featuresList.textContent = '';
        
        // Loop through each feature and create a list item
        // for (let i = 0; i < featuresLength; i++) {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = data.features[i];
        //     featuresList.appendChild(listItem);
        // }

        // featuresList.textContent = '';
        
        // cardsContainer.appendChild(div);
    })
}

const CustomShowModal = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
  const dataDetails = data.data;
  // console.log(data);
  // console.log(dataDetails);
  // console.log(dataDetails.name);

  const modalContainer = document.getElementById
  ('modalContainer');

  modalContainer.textContent = '';

  const div = document.createElement('div');
  div.classList.add('flex', 'flex-row', 'gap-5', 'mb-0');
  div.innerHTML = `
     <!-- Left -->
  <div
    class="flex-1 border-2 px-5 py-5 rounded-lg bg-[#EB57570D] border-[#EB5757]"
  >
    <h1 class="font-bold text-2xl">
      ${dataDetails?.description}
    </h1>

    <!-- Premium Container -->
    <div class="grid grid-cols-3 gap-5 items-center mt-5 mb-5">
      <!-- 1 -->
      <div
        class="bg-white px-5 py-5 rounded-lg font-bold text-center"
      >
        <h1 class="text-green-600">
          $10/ <br />
          month <br />
          Basic
        </h1>
      </div>
      <!-- 2 -->
      <div
        class="bg-white px-5 py-5 rounded-lg font-bold text-center"
      >
        <h1 class="text-amber-600">
          $50/ <br />
          month <br />
          Pro
        </h1>
      </div>
      <!-- 3 -->
      <div
        class="bg-white px-5 py-5 rounded-lg font-bold text-center"
      >
        <h1 class="text-red-600">
          Contact <br />
          us <br />
          Enterprise
        </h1>
      </div>
    </div>

    <!-- Features -->
    <div class="flex flex-row gap-16">
      <!-- Features -->
      <div class="">
        <h1 class="font-bold text-xl mb-2">Features</h1>
        <ul class="px-5 list-disc">
          <li>Customizable responses</li>
          <li>Multilingual support</li>
          <li>Seamless integration</li>
        </ul>
      </div>
      <!-- Integrations -->
      <div class="">
        <h1 class="font-bold mb-2 text-xl">Integrations</h1>
        <ul class="px-5 list-disc">
          <li>FB Messenger</li>
          <li>Slack</li>
          <li>Telegram</li>
        </ul>
      </div>
    </div>
    <!-- End of  Features -->
  </div>
  <!-- End of Left part -->

  <!-- Right -->
  <div
    class="flex-1 border-2 px-5 py-5 rounded-lg flex flex-col justify-center items-center gap-3 text-center relative"
  >
    <img
      class="rounded-lg"
      src="${dataDetails.image_link[0]}"
      alt=""
    />
    <h1 class="font-bold text-2xl">Hi, how are you doing today?</h1>
    <p class="text-lg w-96">
      I'm doing well, thank you for asking. How can I assist you
      today?
    </p>
    <div
      class="absolute bg-red-500 rounded px-4 py-2 right-10 top-12"
    >
      <p class="text-white font-bold">94% accuracy</p>
    </div>
  </div>
  <!-- End of right part -->
  `;
  modalContainer.appendChild(div);

  const modalActionDiv = document.createElement('div');
  modalActionDiv.classList.add('modal-action');
  modalActionDiv.innerHTML = `
    <form method="dialog">
      <button
        class="btn rounded bg-red-600 text-white border-2 border-red-600 hover:bg-transparent hover:border-red-600 hover:text-red-600"
        >
      Close
    </button>
  </form>
`

  modalContainer.appendChild(modalActionDiv);

  custom_modal.showModal();
}



loadAllData();


