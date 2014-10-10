<?php

namespace Tada\Hook;

use Berthe\Hook;
use Tada\Model\Task;
use Tada\Service\NotificationService;

class NotificationSaveHook implements Hook
{
    /** @var NotificationService */
    private $notificationService;

    /** @var bool */
    private $new;

    /**
     * @param NotificationService $notificationService
     */
    function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * @var Task $data
     * @return void
     */
    public function before($data)
    {
        $this->new = $data->getId() ? false : true;
    }

    /**
     * @var Task $data
     * @return void
     */
    public function after($data)
    {
        if ($this->new) {
            $this->notificationService->notifyCreation($data);
        } else {
            $this->notificationService->notifyUpdate($data);
        }
    }
}
